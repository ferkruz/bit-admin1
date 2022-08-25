import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


import { MatDialog } from '@angular/material/dialog';
import { MyModalComponent } from '../../core/components/my-modal/my-modal.component';

export interface DataElement {
  idViaje: string,
  deliveryDate: string,
  shipper: string,
  totalAmount: string,
  docType: string,
  docReceived: string,
  docInput: string,
  docAttached: number,
  id: string
}

const ELEMENT_DATA: DataElement[] = [
  {
   idViaje: "9a1c0e45-b425-4ab2-a47a-4e3bb774f38e",
   deliveryDate: "2021-09-03T17:01:23.557Z",
   shipper: "Nadine Dibbert",
   totalAmount: "615.90",
   docType: "Savings Account",
   docReceived: "Si",
   docInput: "Si",
   docAttached: 1,
   id: "1"
  },
  {
   idViaje: "b302442d-f7b1-40d5-9b52-0fe3b567ba49",
   deliveryDate: "2021-03-12T03:19:04.252Z",
   shipper: "Miss Daryl Breitenberg",
   totalAmount: "52.18",
   docType: "Checking Account",
   docReceived: "Si",
   docInput: "Si",
   docAttached: 2,
   id: "2"
  },
  {
   idViaje: "ab4a02f6-f39d-4a54-bb1c-029b528ce11d",
   deliveryDate: "2021-03-26T10:59:42.290Z",
   shipper: "Theresa Macejkovic",
   totalAmount: "480.48",
   docType: "Money Market Account",
   docReceived: "No",
   docInput: "No",
   docAttached: 0,
   id: "3"
  },
  {
   idViaje: "8db8611c-d43e-4963-9fef-bc3cf823bd7b",
   deliveryDate: "2021-06-23T23:19:00.200Z",
   shipper: "Doyle Jenkins",
   totalAmount: "712.20",
   docType: "Investment Account",
   docReceived: "Si",
   docInput: "Si",
   docAttached: 4,
   id: "4"
  },
  {
   idViaje: "3763afe7-26be-4be5-9e99-6936de0aacd4",
   deliveryDate: "2021-04-07T00:17:11.109Z",
   shipper: "Cassandra Hoppe",
   totalAmount: "462.01",
   docType: "Checking Account",
   docReceived: "Si",
   docInput: "Si",
   docAttached: 5,
   id: "5"
  },
  {
   idViaje: "af2d8671-d284-40e9-aef9-00097a120f84",
   deliveryDate: "2021-09-01T17:46:59.501Z",
   shipper: "Emanuel Gerlach",
   totalAmount: "186.39",
   docType: "Checking Account",
   docReceived: "Si",
   docInput: "Si",
   docAttached: 6,
   id: "6"
  },
  {
   idViaje: "5e13b2cc-fa1e-4995-a2e0-53f13c7c712c",
   deliveryDate: "2021-07-24T09:27:25.876Z",
   shipper: "Ramiro Auer PhD",
   totalAmount: "63.18",
   docType: "Auto Loan Account",
   docReceived: "No",
   docInput: "No",
   docAttached: 0,
   id: "7"
  },
  {
   idViaje: "5e0de9d5-4807-4793-be46-042503e99cf4",
   deliveryDate: "2021-11-27T22:19:31.220Z",
   shipper: "Arlene Torp DVM",
   totalAmount: "769.17",
   docType: "Investment Account",
   docReceived: "Si",
   docInput: "Si",
   docAttached: 8,
   id: "8"
  },
  {
   idViaje: "ac9e0ae1-78ce-46b0-b287-aac1b9781c70",
   deliveryDate: "2021-08-16T12:39:37.072Z",
   shipper: "Leigh Schultz",
   totalAmount: "386.65",
   docType: "Credit Card Account",
   docReceived: "No",
   docInput: "No",
   docAttached: 0,
   id: "9"
  },
  {
   idViaje: "6ab90f5c-18fb-4eb3-bcb5-59753e21b6ce",
   deliveryDate: "2021-06-03T05:32:45.736Z",
   shipper: "Betsy Stoltenberg II",
   totalAmount: "872.35",
   docType: "Auto Loan Account",
   docReceived: "No",
   docInput: "No",
   docAttached: 0,
   id: "10"
  },
  {
   idViaje: "5e98c0ea-b6d2-4738-9f36-6a3c971a98d0",
   deliveryDate: "2021-04-18T21:51:11.159Z",
   shipper: "Andres Nader",
   totalAmount: "691.90",
   docType: "Savings Account",
   docReceived: "Si",
   docInput: "Si",
   docAttached: 11,
   id: "11"
  },
  {
   idViaje: "fdba6c61-0648-4280-bf31-e3575b7111f8",
   deliveryDate: "2021-06-01T17:08:03.959Z",
   shipper: "Clayton Parisian",
   totalAmount: "993.19",
   docType: "Credit Card Account",
   docReceived: "No",
   docInput: "No",
   docAttached: 0,
   id: "12"
  },
  {
   idViaje: "86238932-4018-47c3-832b-bd5b89aca08b",
   deliveryDate: "2021-06-23T16:29:06.641Z",
   shipper: "Jessie Walker",
   totalAmount: "492.85",
   docType: "Investment Account",
   docReceived: "Si",
   docInput: "Si",
   docAttached: 13,
   id: "13"
  }
 ];

 export interface DialogData {
  name: string;
  color: string;
}

@Component({
  selector: 'app-aprob-prefactura',
  templateUrl: './aprob-prefactura.component.html',
  styleUrls: ['./aprob-prefactura.component.sass']
})
export class AprobPrefacturaComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    //this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    //this.setDataSourceAttributes();
  }

  /* setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // if (this.paginator && this.sort) {
    //   this.applyFilter();
    // }
  } */


  displayedColumns: string[] = ['select', 'id', 'deliveryDate', 'shipper', 'totalAmount', 'docType', 'docReceived', 'docInput', 'docAttached'];
  dataSource = new MatTableDataSource<DataElement>(ELEMENT_DATA);
  selection = new SelectionModel<DataElement>(true, []);

/*   selectedFiles;
  showMsg;
  views: boolean;
  offCanvasArray= [];
  uniqueChars: any[];
  preFac = false;
  show; */

  name: string='';
  color: string ='';


  constructor(public dialog: MatDialog) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(MyModalComponent, {
      width: '650px',
      data: { name: "this.name", color: "this.color" }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.color = res;
    });
  }

  ngOnInit(): void {
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => {
          this.selection.select(row);
          console.log('row',row);
        });
  }
 /*  onlyOneToggle(row) {
    this.offCanvasArray.push(row);

    console.log('row',row);

    this.uniqueChars = this.offCanvasArray.filter((c, index) => {
      if(this.offCanvasArray.indexOf(c) === index) {
        // console.log('true');
        this.offCanvasArray.splice(index,row);
      } else {
        // console.log('false');
      }
      return this.offCanvasArray.indexOf(c) === index;
      // console.log(this.uniqueChars);
    });
    console.log(this.uniqueChars);

  }
  sendPre(objArr, title) {
    console.log(this.uniqueChars);
    this.preFac = true;
    this.swalertService.tinyAlert(title);

  } */

  selectedAttachments(element = '') {
    if(element) {
      /* this.showMsg = 'Cargados:';
      this.selectedFiles = element; */
    } else {
      /* this.showMsg = 'Cargar';
      this.selectedFiles= ''; */
    }

  }

  ngAfterViewInit(){

    /* this.paginator.length > 0 ? (this.show = false) : (this.show = true);
    this.dataSource.paginator = this.paginator; */
  }

  sortData(sort: Sort) {
    if (sort.active && sort.direction !== '') {
      this.dataSource.data = this.dataSource.data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          // 'id', 'deliveryDate', 'shipper', 'totalAmount', 'docType', 'docReceived', 'docInput', 'docAttached'
          case 'id': return this.compare(a.id, b.id, isAsc);
          case 'deliveryDate': return this.compare(a.deliveryDate, b.deliveryDate, isAsc);
          case 'deliveryDate': return this.compare(a.deliveryDate, b.deliveryDate, isAsc);
          case 'shipper': return this.compare(a.shipper, b.shipper, isAsc);
          case 'totalAmount': return this.compare(a.totalAmount, b.totalAmount, isAsc);
          case 'docType': return this.compare(a.docType, b.docType, isAsc);
          case 'docReceived': return this.compare(a.docReceived, b.docReceived, isAsc);
          case 'docInput': return this.compare(a.docInput, b.docInput, isAsc);
          case 'docAttached': return this.compare(a.docAttached, b.docAttached, isAsc);
          default: return 0;
        }
      });
    }
  }

  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


}