import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  loadCSVData(filePath: string): Promise<any[]> {
    return d3.csv(filePath);
  }
}
