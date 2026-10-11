import React from 'react';
import { DualPath } from '../components/DualPath';
import { DoorBuildProcess } from '../components/DoorBuildProcess';

export function EstimatorPage() {
  return (
    <div className="w-full">
      <DualPath />
      <DoorBuildProcess />
    </div>
  );
}
