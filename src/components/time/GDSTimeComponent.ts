import {Components} from 'formiojs';
import * as moment from 'moment';

const Field = Components.components['field'];
const Time = Components.components['time'];

export default class GDSTimeComponent extends Time {
    private static MAX_LENGTH = 2;

    public attach(element) {
        this.loadRefs(element, {
            hour: 'single',
            minute: 'single',
        });
        // @ts-ignore
        this.addEventListener(this.refs.hour, 'input', () => {
            this.checkAndValidateHour();
            this.setPristine(false);
            // @ts-ignore
            this.checkComponentValidity(this.data, true);
            // @ts-ignore
            this.updateValue(null, {modified: true})
        });
        // @ts-ignore
        this.addEventListener(this.refs.minute, 'input', () => {
            this.checkAndValidateMinutes();
            this.setPristine(false);
            // @ts-ignore
            this.checkComponentValidity(this.data, true);
            // @ts-ignore
            this.updateValue(null, {modified: true})
        });
        // @ts-ignore
        this.addEventListener(this.refs.hour, 'keypress', (evt) => {
            this.preventNonNumericKeyPress(evt);
        });
        // @ts-ignore
        this.addEventListener(this.refs.minute, 'keypress', (evt) => {
            this.preventNonNumericKeyPress(evt);
        });
        return super.attach(element);
    }

    private preventNonNumericKeyPress(evt) {
        // @ts-ignore
        if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
            // @ts-ignore
            evt.preventDefault();
        }
    }

    private checkAndValidateHour(): void {
        // @ts-ignore
        if (this.refs.hour.value) {
            // @ts-ignore
            if (this.refs.hour.value.length > GDSTimeComponent.MAX_LENGTH) {
                // @ts-ignore
                this.refs.hour.value = this.refs.hour.value.slice(0, 2);
            }
            // @ts-ignore
            const hourAsNumber = parseInt(this.refs.hour.value);
            if (hourAsNumber > 23) {
                // @ts-ignore
                this.refs.hour.value = '23';
            }
            if (hourAsNumber < 0) {
                // @ts-ignore
                this.refs.hour.value = '00';
            }
        }
    }

    private checkAndValidateMinutes(): void {
        // @ts-ignore
        if (this.refs.minute.value) {
            // @ts-ignore
            if (this.refs.minute.value.length > GDSTimeComponent.MAX_LENGTH) {
                // @ts-ignore
                this.refs.minute.value = this.refs.minute.value.slice(0, 2);
            }
            // @ts-ignore
            const minuteAsNumber = parseInt(this.refs.minute.value);
            if (minuteAsNumber > 59) {
                // @ts-ignore
                this.refs.minute.value = '59';
            }
            if (minuteAsNumber < 0) {
                // @ts-ignore
                this.refs.minute.value = '00';
            }
        }
    }

    // @ts-ignore
    public addInputError(message: any, dirty: boolean, element: any): void {
        // @ts-ignore
        super.addInputError(message, dirty, [this.refs.hour, this.refs.minute]);
        // @ts-ignore
        super.addInputError(message, dirty, element)
    }

    public removeInputError(elements) {
        // @ts-ignore
        super.removeInputError([this.refs.hour, this.refs.minute]);
        // @ts-ignore
        super.removeInputError(elements);
    }

    public getValue() {
        // @ts-ignore
        if (!this.refs.hour.value || !this.refs.minute.value) {
            return '';
        }
        // @ts-ignore
        const value = `${this.refs.hour.value}:${this.refs.minute.value}`;
        // @ts-ignore
        return moment(value, this.component.format).format(this.component.dataFormat);
    }

    public setValue(value, flags) {
        if (value) {
            const parts = value.split(':');
            // @ts-ignore
            this.refs.hour.value = parts[0];
            // @ts-ignore
            this.refs.minute.value = parts[1];
            return true;
        }
        return false;
    }

    public render() {
        return Field.prototype.render.call(this, this.renderTemplate('time', {}));
    }
}
