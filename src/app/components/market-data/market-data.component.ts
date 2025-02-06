import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MarketData} from '../../_INTERFACES/market.interface';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

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
    MatListModule,
    MatIconModule
  ],
  templateUrl: './market-data.component.html',
  styleUrl: './market-data.component.scss'
})
export class MarketDataComponent {
  marketDataControl = new FormControl<string | MarketData>('');
  filteredOptions!: Observable<MarketData[]>;
  selectedOption: MarketData | null = null;
  selectedOptionArray: MarketData[] = [];
  markedSelectedOptionArray: MarketData[] = [];
  
  options: MarketData[] = [
    {name: 'Mary', value: 'mary'}, 
    {name: 'Shelley', value: 'shelley'}, 
    {name: 'Wally', value: 'wally'}
  ];


  constructor() { }

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

  private _filter(name: string): MarketData[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  clearInput() {
    console.log(this.marketDataControl);
    this.marketDataControl.reset();
    
  }

  setSelectedOption(option: MarketData) {
    if (this.selectedOptionArray.every((o) => o.value !== option.value)) {
      this.selectedOption = option;
    }
  }

  addOption() {
    if (this.selectedOption) {
      this.selectedOptionArray.push(this.selectedOption);
    }
    this.selectedOption = null;
    this.marketDataControl.reset();
  }

  clearSelectedArray() {
    console.log(this.markedSelectedOptionArray);
    console.log(this.selectedOptionArray);
    
    this.selectedOptionArray = this.selectedOptionArray.filter((o) => this.markedSelectedOptionArray.every((o2) => o.value !== o2.value));
  }



}
