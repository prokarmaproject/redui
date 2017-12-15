import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../data.service';

@Component({
  selector: 'app-trust-admin',
  templateUrl: './trust-admin.component.html',
  styleUrls: ['./trust-admin.component.css']
})
export class TrustAdminComponent implements OnInit {

  public packages:any = [];
  public affiliateGroupsList:any =[];
  public affiliateGroups:any =[];
  public newUserGrp:any={};
  public selectedGroup:any={};
  public selectedSurvey:any;
  public deleteGroup:any;


  public affiliateUsers:any =[];  
  public groupUse:any={};
  public affUser:any = {};
  public selGrp:any={};
  public selectedUser:any={};

  closeResult: string;

  open(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
    });
  }

  addRedAffiliate(){
    this.selectedGroup.users = [];
    this.dataService.addGrpToList(this.selectedGroup).subscribe(response => {
      this.selectedGroup={};
      this.dataService.getAffiliateGroupsList().subscribe(response => {
        this.affiliateGroupsList = response;
        this.selectedGroup = {};
      });
    });
  }
  deleteRedAffiliate(id:any){
    this.dataService.deleteGroupFromList(id).subscribe(response => {
      this.selectedGroup={};
      this.dataService.getAffiliateGroupsList().subscribe(response => {
        this.affiliateGroupsList = response;
        this.selGrp = {};
      });
    });
  }
  editRedAffiliate(){
    console.log(this.selGrp);
    this.dataService.editGroup(this.selGrp).subscribe(response => {
      this.selectedGroup={};
      this.dataService.getAffiliateGroupsList().subscribe(response => {
        this.affiliateGroupsList = response;
        this.selGrp = {};
      });
    });
  }

  //=================================================================
  //=============================================================

  getAffGroupsForSurvey(surveyId:any){
    this.dataService.getSurveyAffiliates(surveyId).subscribe(response => {
      this.affiliateGroups = response[0].affiliateGroups;
    });
  }
  
  importGroups(surveyId:any,group:any){
    var users = [];
    group.users.forEach(function(user){
      let userObj = {
        "RoleType": user.roleType,
        "WindowsUserLogin": user.windowsUserLogin,
        "IsGlobal": user.isGlobal
      };
      users.push(userObj)      ;
    });

    let req ={
      SurveyId: surveyId,
      AffiliateName: group.affiliateGroupName,
      AffiliateCode : group.affiliateGroupCode,
      AffiliateRegion:group.regionName,
      AffiliateId:group.affiliateGroupId,
      Users: users
    };
    console.log(JSON.stringify(req));
    this.dataService.importGroupsToSurvey(req).subscribe(response => {
      this.dataService.getSurveyAffiliates(surveyId).subscribe(response => {
        this.affiliateGroups = response;
      });
    });
  }
  editSurveyGroups(surveyId:any,group:any){
    
  }
  deleteSurveyGroups(surveyId:any,group:any){

  }

  copyGroups(fromSurveyId:any, toSurveyId:any){

  }
  
  
  

  addResource(groupId:any){
    this.affUser.groupId = groupId;
    this.affUser.isGlobal = false;
    this.dataService.addUserForGroup(this.affUser).subscribe(response => {
      this.dataService.getAffiliateGroupsList().subscribe(response => {
        this.affiliateGroupsList = response;
        this.newUserGrp = {};
        this.affUser={};
      });      
    });
    console.log(JSON.stringify(this.affUser));
  }
  
  deleteResource(grpId:any,userId:any){
    console.log(grpId +" : "+ userId);
    this.dataService.deleteUserFromGroup(grpId,userId).subscribe(response => {
      this.selectedUser ={};
      this.dataService.getAffiliateGroupsList().subscribe(response => {
        this.affiliateGroupsList = response;
      });
    });
  }
  editResource(user:any, grpId){
    console.log(user);
    this.dataService.editUser(user,grpId).subscribe(response => {
      this.selectedUser ={};
      this.dataService.getAffiliateGroupsList().subscribe(response => {
        this.affiliateGroupsList = response;
      });
    })
  }



  
  
  constructor(private modalService: NgbModal, private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getSurveys().subscribe(response => {
      this.packages = response;
    });
    this.dataService.getAffiliateGroupsList().subscribe(response => {
      this.affiliateGroupsList = response;
    });
  }

}


import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortgrid'
})

@Injectable()
export class SortGridPipe implements PipeTransform {
    transform(array: Array<any>, args: string): Array<any> {
        if (typeof args[0] === "undefined") {
            return array;
        }
        let direction = args[0][0];
        let column = args.replace('-','');
        array.sort((a: any, b: any) => {
            let left = Number(new Date(a[column]));
            let right = Number(new Date(b[column]));
            return (direction === "-") ? right - left : left - right;
        });
        return array;
    }
}