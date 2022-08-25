import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-select-with-filter',
  templateUrl: './select-with-filter.component.html',
  styleUrls: ['./select-with-filter.component.sass']
})
export class SelectWithFilterComponent implements OnInit {
  @Input() inputLabel: string = '';
  @Input() inputPlaceholder: string = '';
  @Input() list: any[] = [];
  @Input() listKey: string = '';
  @Input() listLabel: string = '';

  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.list.filter(option => option[this.listLabel].toLowerCase().includes(filterValue));
  }
}

