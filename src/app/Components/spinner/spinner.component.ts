import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { SpinnerService } from "../../Services/Spinner/spinner.service";

@Component({
    selector: 'app-spinner',
    standalone: true,
    imports: [CommonModule],
    template: `
    @if (isLoading()) {
        <div class="spinner-border text-primary spinner-border-sm" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
    }
  `
})

export default class SpinnerComponent {

    private readonly spinnerSvc = inject(SpinnerService);
    isLoading = this.spinnerSvc.isLoading;
}