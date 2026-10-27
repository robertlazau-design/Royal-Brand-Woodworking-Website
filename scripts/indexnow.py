"""Submit the Royal Brand Woodworking pages that changed in this push to IndexNow (Bing and friends).

A page counts as changed when its <lastmod> in public/sitemap.xml changed between the previous main
and now. If none did, every page in the sitemap is submitted (titles or styling may still have changed).
We wait until the live site serves the key file and the new sitemap dates, so engines crawl the new version.
"""
import json, os, re, subprocess, sys, time, urllib.request, urllib.error

SITE = "https://www.royalbrandwoodworking.com"
HOST = "www.royalbrandwoodworking.com"
SITEMAP = "public/sitemap.xml"


def find_key():
    for name in os.listdir("public"):
        if re.fullmatch(r"[0-9a-f]{32}\.txt", name):
            return open(f"public/{name}").read().strip()
    sys.exit("No IndexNow key file (public/<32 hex characters>.txt) found.")


KEY = find_key()


def parse(xml):
    out = {}
    for block in xml.split("<url>")[1:]:
        loc = block.split("<loc>")[1].split("</loc>")[0]
        out[loc] = block.split("<lastmod>")[1].split("</lastmod>")[0] if "<lastmod>" in block else ""
    return out


def at(rev):
    try:
        return parse(subprocess.check_output(["git", "show", f"{rev}:{SITEMAP}"], stderr=subprocess.DEVNULL).decode())
    except subprocess.CalledProcessError:
        return {}


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "royalbrand-indexnow/1.0", "Cache-Control": "no-cache"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read().decode("utf-8", "replace")


now = at("HEAD")
before = os.environ.get("BEFORE", "")
old = at(before) if before and set(before) != {"0"} else {}
changed = sorted(u for u, d in now.items() if old.get(u) != d)
if os.environ.get("SUBMIT_ALL") == "true" or not changed:
    changed, reason = sorted(now), "every page (no sitemap date changed, or a full submit was asked for)"
else:
    reason = f"{len(changed)} page(s) with a new date in the sitemap"
print(f"Submitting {reason}: {changed}")

# Wait for Vercel: the key file must be live, and the live sitemap must show the new dates.
deadline = time.time() + 15 * 60
time.sleep(60)
while True:
    try:
        key_ok = get(f"{SITE}/{KEY}.txt").strip() == KEY
        live = parse(get(f"{SITE}/sitemap.xml?t={int(time.time())}"))
        fresh = all(live.get(u) == now[u] for u in changed)
        if key_ok and fresh:
            break
        print(f"Waiting for the deploy (key file live: {key_ok}, new dates live: {fresh})")
    except (urllib.error.URLError, IndexError, TimeoutError) as e:
        print(f"Waiting for the deploy ({e})")
    if time.time() > deadline:
        sys.exit("The deploy didn't show up within 15 minutes; nothing was submitted.")
    time.sleep(20)
time.sleep(30)  # let the CDN settle for pages whose only change was the title or description

body = {"host": HOST, "key": KEY, "keyLocation": f"{SITE}/{KEY}.txt", "urlList": changed}
req = urllib.request.Request("https://api.indexnow.org/indexnow", data=json.dumps(body).encode(),
                             headers={"Content-Type": "application/json; charset=utf-8"}, method="POST")
try:
    with urllib.request.urlopen(req, timeout=30) as r:
        status = r.status
except urllib.error.HTTPError as e:
    sys.exit(f"IndexNow said {e.code}: {e.read().decode('utf-8', 'replace')[:300]}")
msg = f"IndexNow accepted {len(changed)} URL(s) (HTTP {status})."
print(msg)
summary = os.environ.get("GITHUB_STEP_SUMMARY")
if summary:
    with open(summary, "a") as f:
        f.write(f"### {msg}\n\n" + "\n".join(f"- {u}" for u in changed) + "\n")
