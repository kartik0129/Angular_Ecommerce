import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private http: HttpClient) { }
  
  getAnalysis(dates:any) {
    return this.http.post('http://localhost:8080/app/analysis/performAnalysis',dates)
  }
}
