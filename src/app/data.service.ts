import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  private headers = new Headers({'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'*'});

  private serviceUrl = "http://localhost:8011/api";

  constructor(private http: Http) { }

  saveSurvey(ServeyData: any):Observable<any> {
    let options = new RequestOptions({headers: this.headers});
    return this.http.post(this.serviceUrl + '/section/', ServeyData, options)
        .map(this.extractData);
        // .catch(this.handleError);
  }

  updateSurveyQuestions(ServeyData: any):Observable<any> {
    let options = new RequestOptions({headers: this.headers});
    return this.http.put(this.serviceUrl + '/survey/', ServeyData, options)
        .map(this.extractData);
        // .catch(this.handleError);
  }

  createSurvey(newSurvey:any):Observable<any>{
    let options = new RequestOptions({headers: this.headers});
    return this.http.post(this.serviceUrl + '/survey/',newSurvey,  options)
        .map(this.extractData);
  }

  updateSurvey(updateSurvey:any):Observable<any>{
    let options = new RequestOptions({headers: this.headers});
    return this.http.put(this.serviceUrl + '/survey/',updateSurvey,  options)
        .map(this.extractData);
  }


  getSurveys(){
    let options = new RequestOptions({headers: this.headers});
    return this.http.get(this.serviceUrl + '/survey/',  options)
        .map(this.extractData);
  }

  getSurveyQuestions(id:any){
    let options = new RequestOptions({headers: this.headers});
    return this.http.get(this.serviceUrl + '/section/'+id,  options)
        .map(this.extractData);
  }

  getSurveyData(id:any){
    let options = new RequestOptions({headers: this.headers});
    return this.http.get(this.serviceUrl + '/survey/'+id,  options)
        .map(this.extractData);
  }

  getSurveyGroups(surveyId:any){
    let options = new RequestOptions({headers: this.headers});
    return this.http.get(this.serviceUrl + '/SurveyGroup/'+surveyId,  options)
        .map(this.extractData);
  }

  importGroupsToSurvey(req:any){
    let options = new RequestOptions({headers: this.headers});
    return this.http.post(this.serviceUrl + '/SurveyAffiliate/', req, options)
        .map(this.deletedata);
  }

  getSurveyAffiliates(id:any){
    let options = new RequestOptions({headers: this.headers});
    return this.http.get(this.serviceUrl + '/SurveyAffiliate/'+id,  options)
        .map(this.extractData);
  }

  getAffiliateGroupsList(){
    let options = new RequestOptions({headers: this.headers});
    return this.http.get(this.serviceUrl + '/affiliate/',  options)
        .map(this.extractData);
  }
 
  addGrpToList(group:any){
    let options = new RequestOptions({headers: this.headers});
    return this.http.post(this.serviceUrl + '/Affiliate/', group, options)
        .map(this.extractData);
  }
  deleteGroupFromList(groupId:any){
    let options = new RequestOptions({headers: this.headers});
    return this.http.delete(this.serviceUrl + '/Affiliate/'+groupId, options)
        .map(this.deletedata);
  }
  editGroup(grp:any){
    let req = {
      "AffiliateGroupCode":grp.affiliateGroupCode,
      "AffiliateGroupName":grp.affiliateGroupName,
      "RegionName": grp.regionName
    };
    let options = new RequestOptions({headers: this.headers});
    return this.http.put(this.serviceUrl + '/affiliate/'+grp.affiliateGroupId, req, options)
        .map(this.extractData);
  }
  addUserForGroup(user:any){
    let options = new RequestOptions({headers: this.headers});
    return this.http.post(this.serviceUrl + '/User/' ,user,  options)
        .map(this.extractData);
  }
  deleteUserFromGroup(grpId:any,userId:any){
    let options = new RequestOptions({headers: this.headers});
    return this.http.delete(this.serviceUrl + '/User/'+userId+'/'+grpId, options)
        .map(this.deletedata);
  }
  editUser(user:any,id:any){
    let req = {
      "WindowsUserLogin": user.windowsUserLogin,
      "RoleType": user.roleType,
      "RegionName": "Sacramento",
      "IsGlobal":false
    }
    let options = new RequestOptions({headers: this.headers});
    return this.http.put(this.serviceUrl + '/User/'+user.userId+'/'+user.groupId ,req,  options)
        .map(this.extractData);
  }

  private deletedata(res:Response){
    return {}
  }
  private extractData(res: Response) {    
    return res.json() || {};
  }

  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error); 
  //   return Promise.reject(error.message || error);
  // }

  public currentSurveyId:any;

  setCurrentSurveyId(id:any){
    this.currentSurveyId = id;
  }

  getCurrentSurveyId(){
    return this.currentSurveyId;
  }
}
