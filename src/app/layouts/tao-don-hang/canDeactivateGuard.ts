import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { TaoDonHangComponent } from './tao-don-hang.component';
import { Observable } from "rxjs";

@Injectable()
export class PendingChangesGuard implements CanDeactivate<TaoDonHangComponent> {
  canDeactivate(component: TaoDonHangComponent){
    return confirm('WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.');
  }
}
