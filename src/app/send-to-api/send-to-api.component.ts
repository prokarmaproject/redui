import { Component, OnInit, Input } from '@angular/core';
import { APIWrapperService } from '../apiwrapper.service';
import { Section } from './Models/Section';
import { Question } from './Models/Question';
import { Answer } from './Models/Answer';
import { QuestionType } from './Models/QuestionType';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Request, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-send-to-api',
  templateUrl: './send-to-api.component.html',
  styleUrls: ['./send-to-api.component.css']
})
export class SendToApiComponent implements OnInit {

  returnedJsonFromUi: Array<any>;
  sectionArray: Array<Section> = new Array<Section>();
  subQuestions: Array<Question>;
  private apiUrl: string = "http://localhost:55761/api/section/";

  constructor(private apiWrapperService: APIWrapperService, private http: Http) {
    this.returnedJsonFromUi = <Array<any>>this.apiWrapperService.getFromUI();
    this.ProcessSections();
    this.PostData();
  }
  ngOnInit() {
  }

  ProcessSections() {
    console.log(this.returnedJsonFromUi);
    this.returnedJsonFromUi.forEach(section => {
      let sectionObject: Section = {
        SectionName: section.sectionName,
        Questions: null,
        ParentSectionId: null,
        MainQuestion: {
          QuestionName: section.questionText,
          QuestionType: 0,
          ParentQuestion: null,
          Answer: {
            AnswerText: section.answer
            //AnswerOptions:section.options
          }
        }
      };
      //check for sub questions and add to the above object
      if (section.subQuestions != undefined) {
        this.subQuestions = new Array<Question>();
        (<Array<any>>section.subQuestions).forEach(subQues => {
          let subQuestion: Question = {
            QuestionName: subQues.subQueText,
            QuestionType: 0,
            ParentQuestion: null,
            Answer: {
              AnswerText: subQues.subQueAnswer
              //AnswerOptions:subQues.options
            }
          }
          //add it to the sub question array
          this.subQuestions.push(subQuestion);
        });
        //console.log(sectionObject);
        //assign the subQuestions to the parent object
        sectionObject.Questions = this.subQuestions;
      }
      else {
        //assign the subQuestions to the parent object
        sectionObject.Questions = null;
      }

      //add sub questions to the main sections object
      this.sectionArray.push(sectionObject);
      console.log(sectionObject);
    });



  }

  PostData() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.apiUrl, JSON.stringify(this.sectionArray), options).subscribe(re => { console.log(re) });
console.log(JSON.stringify(this.sectionArray));

  }

}
