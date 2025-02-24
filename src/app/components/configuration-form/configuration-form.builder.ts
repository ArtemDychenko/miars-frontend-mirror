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
  id: FormControl<string | undefined>;
  name: FormControl<string>;
  source_mac: FormControl<string[]>;
  dest_mac: FormControl<string[]>;
  frame_ranges: FormControl<[number, number][]>;
  protocols: FormControl<string[]>;

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
      id: fb.control<string | undefined>(configuration?.id),
      name: fb.control<string>(configuration?.name || '', {
        validators: [Validators.required],
      }),
      source_mac: fb.control<string[]>(configuration?.mac_source || []),
      dest_mac: fb.control<string[]>(configuration?.mac_destination || []),
      frame_ranges: fb.control<[number, number][]>(
        configuration?.frame_ranges || []
      ),
      protocols: fb.control<string[]>(configuration?.protocols || []),

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
      id: data.id,
      name: data.name,
      is_applied: false,
      mac_source: data.source_mac || [],
      mac_destination: data.dest_mac || [],
      frame_ranges: data.frame_ranges || [],
      protocols: data.protocols || [],
    };
  }
}
