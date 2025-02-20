import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ConfigurationTemplateComponent } from '../configuration-template/configuration-template.component';
import { Configuration } from '../../models/configuration';
import {
  ConfigurationForm,
  ConfigurationFormBuilder,
  SizeRanges,
  Protocols,
} from './configuration-form.builder';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { PillComponent } from '../pill/pill.component';

@Component({
  selector: 'app-configuration-form',
  imports: [
    ConfigurationTemplateComponent,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    PillComponent,
    MatError,
    MatHint,
  ],
  templateUrl: './configuration-form.component.html',
  styleUrl: './configuration-form.component.scss',
})
export class ConfigurationFormComponent implements OnInit {
  configurationFormBuilder = inject(ConfigurationFormBuilder);
  configuration = input<Configuration>();
  form!: ConfigurationForm;

  sizeRangeOptions = signal<[number, number][]>(SizeRanges);
  protocolOptions = signal<string[]>(Protocols);

  ngOnInit() {
    this.form = this.configurationFormBuilder.create(this.configuration());
  }

  addSourceMac(sourceMac: string) {
    if (!this.form.controls.source_mac_control.errors) {
      this.form.controls.source_mac.value?.push(sourceMac);
    }
  }

  removeSourceMac(index: number) {
    this.form.controls.source_mac.value?.splice(index, 1);
  }

  addDestMac(destMac: string) {
    if (!this.form.controls.dest_mac_control.errors) {
      this.form.controls.dest_mac.value?.push(destMac);
    }
  }

  removeDestMac(index: number) {
    this.form.controls.dest_mac.value?.splice(index, 1);
  }

  addFrameRange(frameRange: [number, number]) {
    this.form.controls.frame_ranges.value?.push(frameRange);
    this.updateSizeRangeOptions();
  }

  removeFrameRange(index: number) {
    this.form.controls.frame_ranges.value?.splice(index, 1);
    this.updateSizeRangeOptions();
  }

  addProtocol(protocol: string) {
    this.form.controls.protocols.value?.push(protocol);
    this.updateProtocolOptions();
  }

  removeProtocol(index: number) {
    this.form.controls.protocols.value?.splice(index, 1);
    this.updateProtocolOptions();
  }

  updateSizeRangeOptions() {
    const chosenRanges = this.form.controls.frame_ranges.value;
    if (!chosenRanges) return;
    const sizeRanges = SizeRanges.filter(
      range => !chosenRanges.includes(range)
    );
    this.sizeRangeOptions.set(sizeRanges);
  }

  updateProtocolOptions() {
    const chosenProtocols = this.form.controls.protocols.value;
    if (!chosenProtocols) return;
    const protocols = Protocols.filter(
      protocol => !chosenProtocols.includes(protocol)
    );
    this.protocolOptions.set(protocols);
  }
}
