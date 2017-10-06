import { Component, OnInit } from '@angular/core';
import { exec } from 'child-process-promise';
import * as terminalTableParser from 'terminal-table-parser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = `Here we go!`;

  constructor() {
     exec('kubectl get all')
     .then(function (result) {
        var stdout = terminalTableParser(result.stdout);
        var stderr = terminalTableParser(result.stderr);
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
     })
     .catch(function (err) {
        console.error('ERROR: ', err);
     });
  }

  ngOnInit() {
  }

}
