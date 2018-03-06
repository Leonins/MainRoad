import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, MenuController } from 'ionic-angular';

//import { AngularFireDatabase} from 'angularfire2/database';
import { FinesAndPenaltiesService } from '../../services/fines-and-penalties/fines-and-penalties.service';
import { Observable } from 'rxjs/Observable';
import { violation_fines } from '../../models/finesAndPenalties/filesAndPenalties.model';
/**
 * Generated class for the FinesAndPenaltiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { FinesAndPenaltiesDetailPage } from '../fines-and-penalties-detail/fines-and-penalties-detail';
@IonicPage()
@Component({
  selector: 'page-fines-and-penalties',
  templateUrl: 'fines-and-penalties.html',
})
//use a loader at the time of api call
export class FinesAndPenaltiesPage {
  private showPenalties: Array<violation_fines> = [];
  private savedPenalties: Array<violation_fines> = [];
  private searchQuery: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, app: App, menu: MenuController,
    private fineAndPenalties: FinesAndPenaltiesService) {

    menu.enable(true);
    menu.swipeEnable(true);
    let _this = this;
    this.fineAndPenalties.getFinesAndPenalties().snapshotChanges().subscribe(snapshots => {
      let penalities = [];
      snapshots.forEach(snapshot => {
        penalities.push(snapshot.payload.val());
      });
      _this.showPenalties = penalities;
      _this.savedPenalties = penalities;
    })

  }


  ionViewDidLoad() {
  }
  searchPenalties() {
    if (this.searchQuery !== '' || this.searchQuery === undefined) {
      let searchContent = []
      this.savedPenalties.forEach((penality) => {
        if (penality.vf_name.indexOf(this.searchQuery) != -1) {
          searchContent.push(penality)
        }
      })
      this.showPenalties = searchContent
    }
    else {
      this.showPenalties = this.savedPenalties
    }
  }

  showPenalitiesDetails(penalities: violation_fines) {
    this.navCtrl.push(FinesAndPenaltiesDetailPage, { 'finePenalities': penalities });
  }
}

