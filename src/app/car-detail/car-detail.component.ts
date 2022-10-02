import { environment } from './../../environments/environment';
import { CarDetails } from './../car-details.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {

  constructor(private http: HttpClient) { }

  carDetails!: CarDetails[];
  responseReceived = false;

  ngOnInit() {
    console.log('breakpoint');
    // setTimeout(() => {
    //   this.http.get(environment.carDetailsEndPoint)
    //   .subscribe((response: any) => {
    //     this.responseReceived = true;
    //     this.carDetails = response.results;
    //   });
    // }, 2000);
    this.http.get(environment.carDetailsEndPoint)
      .subscribe((response: any) => {
        this.responseReceived = true;
        this.carDetails = response.results;
      });
  }

}
