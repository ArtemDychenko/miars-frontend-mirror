import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { inject, Injectable } from '@angular/core';
import { Settings } from '../../models/settings';
import { interval, shareReplay, switchMap } from 'rxjs';
import { DashboardApi } from '../../api/dashboard.api';

export type SettingsForm = FormGroup<{
  showTotalPackets: FormControl<boolean>;
  showPacketsPerSec: FormControl<boolean>;
  showTotalBytes: FormControl<boolean>;
  showBytesPerSec: FormControl<boolean>;

  showETH: FormControl<boolean>;
  protocols: FormGroup<{ [key: string]: FormControl<boolean> }>;

  showMinValue: FormControl<boolean>;
  showMaxValue: FormControl<boolean>;
  showCurrentValue: FormControl<boolean>;
}>;

@Injectable({
  providedIn: 'root',
})
export class SettingsFormBuilder {
  formBuilder = inject(FormBuilder);

  createDefaultForm(protocols: string[]): SettingsForm {
    const fb = this.formBuilder.nonNullable;

    const protocolControls = protocols.reduce(
      (acc, protocolName) => {
        acc[protocolName] = new FormControl<boolean>(true, {
          nonNullable: true,
        });
        return acc;
      },
      {} as { [key: string]: FormControl<boolean> }
    );

    const form = fb.group({
      showTotalPackets: fb.control<boolean>(true),
      showPacketsPerSec: fb.control<boolean>(true),
      showTotalBytes: fb.control<boolean>(true),
      showBytesPerSec: fb.control<boolean>(true),

      showETH: fb.control<boolean>(true),
      protocols: fb.group<{ [key: string]: FormControl<boolean> }>(
        protocolControls
      ),

      showMinValue: fb.control<boolean>(true),
      showMaxValue: fb.control<boolean>(true),
      showCurrentValue: fb.control<boolean>(true),
    });

    return form;
  }

  toValue(form: SettingsForm): Settings {
    return form.getRawValue();
  }
}
