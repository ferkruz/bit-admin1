import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';

import { ToCollect } from "./service/to-collect.viajesfacturar";
import { ViajesfacturarAPIService } from "./service/viajesfacturar-api.service";
import { LoadingService } from './service/loading.service';

import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-viajesfacturar',
  templateUrl: './viajesfacturar.component.html',
  styleUrls: ['./viajesfacturar.component.scss']
})
export class ViajesfacturarComponent implements OnInit, AfterViewInit {

  loading$ = this.loader.loading$;
  
  tocollect: ToCollect[] = [];
  public displayedColumns = [
    'firstName', 'lastName', 'studentEmail', 'yearOfStudy', 'registrationNumber', 'course' 
  ];
  
  
  public dataSource = new MatTableDataSource<ToCollect>();
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  constructor(
    private ViajesfacturarAPIService: ViajesfacturarAPIService,
    public loader: LoadingService,
    private http: HttpClient
    ) {    
  }

  ngOnInit(){
    this.getToCollectInformation();

    //this.loader.show()
  }

  ngAfterViewInit(): void {
    console.log(this.sort); 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  getToCollectInformation(){
    this.loader.show()
    this.ViajesfacturarAPIService.getToCollectInformation()
      .subscribe((res)=>{        
        console.log(res);
        this.dataSource.data = res;
        this.loader.hide()
      })
  }

  getToMultipleData() {
    this.http
      .get('https://pokeapi.co/api/v2/pokemon-species/aegislash')
      .subscribe((res) => {
        console.log(res);
      });

      this.http.get('https://pokeapi.co/api/v2/pokemon-species/aegislash').pipe(
        concatMap(() => this.http.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')),
        concatMap(() => this.http.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')),
        concatMap(() => this.http.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')),
      )
      .subscribe((res) => {
        console.log(res);
      });
    
  }
}
