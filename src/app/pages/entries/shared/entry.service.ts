import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { Entry } from "./entry.model";
import { CategoryService } from '../../categories/shared/category.service';
import { Observable, flatMap, map, throwError } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(
    protected override injector: Injector,
    private categoryService: CategoryService
    ) {
      super("api/entries", injector, Entry.fromJson);
    }

  override create(entry: Entry): Observable<Entry>{
    return this.setCategoryAndSendToServer(entry, super.create.bind(this));
  }

  override update(entry: Entry): Observable<Entry>{
    return this.setCategoryAndSendToServer(entry, super.update.bind(this));
  }

  private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<Entry>{
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return sendFn(entry);
      })
    )
  }

  getByMonthAndYear(month: number, year: number): Observable<Entry[]>{

    //Deveria ser criado um método para retornar os dados com os filtros passados
    //Como não tem api neste projeto implementei dessa forma para facilitar

    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year))
    )
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number){
    return entries.filter(entry => {
      const entryDate = moment(entry.date, "DD/MM/YYYY");
      const monthMatches = (entryDate.month()+1) == month;
      const yearMatches = entryDate.year() == year;

      if(monthMatches && yearMatches)
        return entry;
      else
        return null;
    })
  }
}
