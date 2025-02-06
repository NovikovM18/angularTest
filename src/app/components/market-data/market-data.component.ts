import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MarketData} from '../../_INTERFACES/market.interface';
import {MatIconModule} from '@angular/material/icon';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'app-market-data',
  imports: [
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIconModule,
    MatTableModule, 
    MatCheckboxModule
  ],
  templateUrl: './market-data.component.html',
  styleUrl: './market-data.component.scss'
})
export class MarketDataComponent {
  marketDataControl = new FormControl<string | MarketData>('');
  filteredOptions!: Observable<MarketData[]>;
  selectedOption: MarketData | null = null;
  options: MarketData[] = [
    {name: 'Mary', value: 'mary'}, 
    {name: 'Shelley', value: 'shelley'}, 
    {name: 'Wally', value: 'wally'}
  ];
  displayedColumns: string[] = ['select', 'name', 'price', 'time'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);


  ngOnInit() {
    this.filterOptions();
  }

  filterOptions() {
    this.filteredOptions = this.marketDataControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const res = typeof value === 'string' ? value : value?.name;
        return res ? this._filter(res as string) : this.options.slice();
      }),
    );
  }

  displayFn(data: MarketData): string {  
    return data && data.name ? data.name : '';
  }

  _filter(name: string): MarketData[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  clearInput() {
    this.marketDataControl.reset();
  }

  setSelectedOption(option: MarketData) {
    if (this.dataSource.data.every((o) => o.value !== option.value)) {
      this.selectedOption = option;
    }
  }

  addOption() {
    if (this.selectedOption) {
      this.dataSource.data = [...this.dataSource.data, this.selectedOption];
    }
    this.selectedOption = null;
    this.marketDataControl.reset();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  deleteRows() {
    this.dataSource.data = this.dataSource.data.filter((o) =>this.selection.selected.every((o2) => o.value !== o2.value));
    this.selection.clear();

  }


}
