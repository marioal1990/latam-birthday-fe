import { Component, OnInit } from '@angular/core';
import { Person } from '../domains/person';
import { PersonService } from '../services/person.service';
import { ConstantPool } from '@angular/compiler';
import { PersonInput } from '../domains/person-input';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  person: PersonInput = new PersonInput();
  personForm: Person = new Person();
  success: boolean = false;

  constructor(private service: PersonService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    //PARSEO
    let personSend = new Person();
    personSend.name = this.person.name;
    personSend.lastName = this.person.lastName;
    personSend.birthday = this.person.birthday.format("DD/MM/YYYY");
    console.log(personSend.birthday);
    //LIMPIA EL FORMULARIO
    this.onClean();
    //LLAMA AL SERVICIO
    this.service.savePerson(personSend).subscribe(person => {
      this.personForm = person as Person;
    });
  }

  onClean(){
    this.person.name = null;
    this.person.lastName = null;
    this.person.birthday = null;
  }

}
