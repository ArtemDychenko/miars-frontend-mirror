import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { inject, Injectable } from '@angular/core';
import { Settings } from '../../models/settings';

export type SettingsForm = FormGroup<{
  showTotalPackets: FormControl<boolean>;
  showPacketsPerSec: FormControl<boolean>;
  showTotalBytes: FormControl<boolean>;
  showBytesPerSec: FormControl<boolean>;

  showETH: FormControl<boolean>;
  showIPv4: FormControl<boolean>;
  showIPv6: FormControl<boolean>;
  showTCP: FormControl<boolean>;

  showMinValue: FormControl<boolean>;
  showMaxValue: FormControl<boolean>;
  showCurrentValue: FormControl<boolean>;
}>;

@Injectable({
  providedIn: 'root',
})
export class SettingsFormBuilder {
  formBuilder = inject(FormBuilder);

  create(settings?: Settings): SettingsForm {
    const fb = this.formBuilder.nonNullable;

    return fb.group({
      showTotalPackets: fb.control<boolean>(settings?.showTotalPackets || true),
      showPacketsPerSec: fb.control<boolean>(
        settings?.showPacketsPerSec || true
      ),
      showTotalBytes: fb.control<boolean>(settings?.showTotalBytes || true),
      showBytesPerSec: fb.control<boolean>(settings?.showBytesPerSec || true),

      showETH: fb.control<boolean>(settings?.showETH || true),
      showIPv4: fb.control<boolean>(settings?.showIPv4 || true),
      showIPv6: fb.control<boolean>(settings?.showIPv6 || true),
      showTCP: fb.control<boolean>(settings?.showTCP || true),

      showMinValue: fb.control<boolean>(settings?.showMinValue || true),
      showMaxValue: fb.control<boolean>(settings?.showMaxValue || true),
      showCurrentValue: fb.control<boolean>(settings?.showCurrentValue || true),
    });
  }

  toValue(form: SettingsForm): Settings {
    const data = form.value;
    return <Settings>{
      showTotalPackets: data.showTotalPackets ?? true,
      showPacketsPerSec: data.showPacketsPerSec ?? true,
      showTotalBytes: data.showTotalBytes ?? true,
      showBytesPerSec: data.showBytesPerSec ?? true,

      showETH: data.showETH ?? true,
      showIPv4: data.showIPv4 ?? true,
      showIPv6: data.showIPv6 ?? true,
      showTCP: data.showTCP ?? true,

      showMinValue: data.showMinValue ?? true,
      showMaxValue: data.showMaxValue ?? true,
      showCurrentValue: data.showCurrentValue ?? true,
    };
  }
}
