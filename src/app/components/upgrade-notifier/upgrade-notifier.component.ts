import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CompareVersions from 'compare-versions';
import { AppConstants } from '../../constants/app-constants';
import { shell } from 'electron';

interface HomeBaseResponse {
  channel: {
    [channelKey: string]: {
      current_version: string;
      download_link: string;
    }
  };
}

@Component({
  selector: 'app-upgrade-notifier',
  templateUrl: './upgrade-notifier.component.html',
  styleUrls: ['./upgrade-notifier.component.scss']
})
export class UpgradeNotifierComponent implements OnInit {

  showNotification = false;
  appVersion = AppConstants.RELEASE.VERSION;
  channelData: {
    current_version: string;
    download_link: string;
  };

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get<HomeBaseResponse>('http://www.matthaugen.com/kube_control/home_base.json').subscribe(data => {
      if (CompareVersions(this.appVersion, data.channel[AppConstants.RELEASE.CHANNEL].current_version) === -1) {
        this.channelData = data.channel[AppConstants.RELEASE.CHANNEL];
        this.showNotification = true;
      }
    });
  }

  launchDownloadLink() {
    shell.openExternal(this.channelData.download_link);
  }

  hideNotification() {
    this.showNotification = false;
  }
}
