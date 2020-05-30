import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonService } from '../services/person.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PersonInterface } from '../interfaces/person-interface';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  displayedColumns: string[] = [
    'id', 'name', 'lastName', 'birthday', 
    'age', 'poem', 'daysLeft'
  ];
  dataSource: MatTableDataSource<PersonInterface>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getAllPersons();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private services: PersonService) {
  }

  getAllPersons() {
    this.services.getAllPersons().subscribe((data: {}) => {
      console.log(data);
      this.dataSource.data = data as PersonInterface[];
    });
  }

  updateTablePersons(){
    this.getAllPersons();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
