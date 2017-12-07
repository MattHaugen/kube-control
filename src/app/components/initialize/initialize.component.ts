import { Component, OnInit } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initialize',
  templateUrl: './initialize.component.html',
  styleUrls: ['./initialize.component.scss']
})
export class InitializeComponent implements OnInit {

  readinessPercent = 0;
  numberOfChecks = 1;
  errors = [];

  constructor(
    private kubectlService: KubectlService,
    private router: Router
  ) {}

  ngOnInit() {
    const checkPromises = [
      this.verifyKubectl()
    ];

    Promise.all(checkPromises).then(results => {
      if (!results.includes(false)) {
        this.router.navigate(['/home']);
      }
    })
    .catch(error => {
      this.errors.push(error);
    })
  }

  verifyKubectl(): Promise<boolean> {
    return this.kubectlService.getVersion().then(result => {
      if (!result.includes('Client Version')) {
        this.errors.push('Kubectl not found')
        return false;
      }

      this.readinessPercent += (100 / this.numberOfChecks);
      return true;
    })
  }
}
