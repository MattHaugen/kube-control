import { Component, OnInit } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private kubectlService: KubectlService,
    private router: Router
  ) {}

  ngOnInit() {

  }
}
