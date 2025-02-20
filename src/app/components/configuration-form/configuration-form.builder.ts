import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { inject, Injectable } from '@angular/core';
import { Configuration } from '../../models/configuration';

export const SizeRanges: [number, number][] = [
  [0, 63],
  [64, 127],
  [128, 255],
  [256, 511],
  [512, 1023],
  [1024, 1518],
  [1519, Infinity],
];

export const Protocols: string[] = [
  'ARP',
  'IPv4',
  'IPv6',
  'ICMP',
  'TCP',
  'UDP',
];

export type ConfigurationForm = FormGroup<{
  name: FormControl<string>;
  source_mac: FormControl<string[] | undefined>;
  dest_mac: FormControl<string[] | undefined>;
  frame_ranges: FormControl<[number, number][] | undefined>;
  protocols: FormControl<string[] | undefined>;

  source_mac_control: FormControl<string>;
  dest_mac_control: FormControl<string>;
}>;

@Injectable({
  providedIn: 'root',
})
export class ConfigurationFormBuilder {
  formBuilder = inject(FormBuilder);

  create(configuration?: Configuration): ConfigurationForm {
    const fb = this.formBuilder.nonNullable;

    return fb.group({
      name: fb.control<string>(configuration?.name || '', {
        validators: [Validators.required],
      }),
      source_mac: fb.control<string[] | undefined>(
        configuration?.mac_source || undefined
      ),
      dest_mac: fb.control<string[] | undefined>(
        configuration?.mac_destination || undefined
      ),
      frame_ranges: fb.control<[number, number][] | undefined>(
        configuration?.frame_ranges || undefined
      ),
      protocols: fb.control<string[] | undefined>(
        configuration?.protocols || undefined
      ),

      source_mac_control: fb.control<string>('', {
        validators: [
          Validators.pattern(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/),
        ],
      }),
      dest_mac_control: fb.control<string>('', {
        validators: [
          Validators.pattern(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/),
        ],
      }),
    });
  }

  toValue(form: ConfigurationForm): Configuration {
    const data = form.value;
    return <Configuration>{
      id: '',
      name: data.name,
      is_applied: false,
      mac_source: data.source_mac || [],
      mac_destination: data.dest_mac || [],
      frame_ranges: data.frame_ranges || [],
      protocols: data.protocols || [],
    };
  }
}
