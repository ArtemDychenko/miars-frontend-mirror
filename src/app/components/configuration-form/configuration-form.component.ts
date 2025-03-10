import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { ConfigurationTemplateComponent } from '../configuration-template/configuration-template.component';
import { Configuration } from '../../models/configuration';
import {
  ConfigurationForm,
  ConfigurationFormBuilder,
  Protocols,
  SizeRanges,
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
import { ButtonComponent } from '../button/button.component';

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
    ButtonComponent,
  ],
  templateUrl: './configuration-form.component.html',
  styleUrl: './configuration-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationFormComponent implements OnInit {
  configurationFormBuilder = inject(ConfigurationFormBuilder);
  configuration = input<Configuration>();
  form!: ConfigurationForm;

  submit = output<Configuration>();
  cancel = output<void>();

  sizeRangeOptions = signal<[number, number][]>(SizeRanges);
  protocolOptions = signal<string[]>(Protocols);

  ngOnInit() {
    this.form = this.configurationFormBuilder.create(this.configuration());
    this.updateSizeRangeOptions();
    this.updateProtocolOptions();
  }

  onSubmit() {
    if (this.form.valid) {
      this.submit.emit(this.configurationFormBuilder.toValue(this.form));
    } else {
      this.form.markAsDirty();
    }
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
    const chosenRanges = this.form.controls.frame_ranges.value ?? [];
    const sizeRanges = SizeRanges.filter(
      range =>
        !chosenRanges.some(cr => cr[0] === range[0] && cr[1] === range[1])
    );
    this.sizeRangeOptions.set(sizeRanges);
  }

  updateProtocolOptions() {
    const chosenProtocols = this.form.controls.protocols.value ?? [];
    const protocols = Protocols.filter(
      protocol => !chosenProtocols.includes(protocol)
    );
    this.protocolOptions.set(protocols);
  }
}
