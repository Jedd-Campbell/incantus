import Utils from "../utils";

export default class Stats {

    // health points
    _health: number;

    // buffs
    _ignisBuffMod: number = 1;
    _aquaeBuffMod: number = 1;
    _mortisBuffMod: number = 1;
    _vitaeBuffMod: number = 1;
    _luminisBuffMod: number = 1;
    _tenebrisBuffMod: number = 1;

    // debuffs
    _ignisDebuffMod: number = 1;
    _aquaeDebuffMod: number = 1;
    _mortisDebuffMod: number = 1;
    _vitaeDebuffMod: number = 1;
    _luminisDebuffMod: number = 1;
    _tenebrisDebuffMod: number = 1;

    // clamp values
    private modMin: number = 0;
    private modMax: number = 10;
    private healthMin: number = 0;
    private healthMax: number = 1000;

    constructor() {
        this._health = 100;
    }

    public get health() { return Utils.clamp(this._health, this.healthMin, this.healthMax); }
    public set health(value: number) { this._health = Utils.clamp(value, this.healthMin, this.healthMax); }

    // Buff Modifiers
    public get ignisBuffMod() { return Utils.clamp(this._ignisBuffMod, this.modMin, this.modMax); }
    public get aquaeBuffMod() { return Utils.clamp(this._aquaeBuffMod, this.modMin, this.modMax); }
    public get mortisBuffMod() { return Utils.clamp(this._mortisBuffMod, this.modMin, this.modMax); }
    public get vitaeBuffMod() { return Utils.clamp(this._vitaeBuffMod, this.modMin, this.modMax); }
    public get luminisBuffMod() { return Utils.clamp(this._luminisBuffMod, this.modMin, this.modMax); }
    public get tenebrisBuffMod() { return Utils.clamp(this._tenebrisBuffMod, this.modMin, this.modMax); }

    public set ignisBuffMod(value: number) { this._ignisBuffMod = Utils.clamp(value, this.modMin, this.modMax); }
    public set aquaeBuffMod(value: number) { this._aquaeBuffMod = Utils.clamp(value, this.modMin, this.modMax); }
    public set mortisBuffMod(value: number) { this._mortisBuffMod = Utils.clamp(value, this.modMin, this.modMax); }
    public set vitaeBuffMod(value: number) { this._vitaeBuffMod = Utils.clamp(value, this.modMin, this.modMax); }
    public set luminisBuffMod(value: number) { this._luminisBuffMod = Utils.clamp(value, this.modMin, this.modMax); }
    public set tenebrisBuffMod(value: number) { this._tenebrisBuffMod = Utils.clamp(value, this.modMin, this.modMax); }

    // Debuff Modifiers
    public get ignisDebuffMod() { return Utils.clamp(this._ignisDebuffMod, this.modMin, this.modMax); }
    public get aquaeDebuffMod() { return Utils.clamp(this._aquaeDebuffMod, this.modMin, this.modMax); }
    public get mortisDebuffMod() { return Utils.clamp(this._mortisDebuffMod, this.modMin, this.modMax); }
    public get vitaeDebuffMod() { return Utils.clamp(this._vitaeDebuffMod, this.modMin, this.modMax); }
    public get luminisDebuffMod() { return Utils.clamp(this._luminisDebuffMod, this.modMin, this.modMax); }
    public get tenebrisDebuffMod() { return Utils.clamp(this._tenebrisDebuffMod, this.modMin, this.modMax); }

    public set ignisDebuffMod(value: number) { this._ignisDebuffMod = Utils.clamp(value, this.modMin, this.modMax); }
    public set aquaeDebuffMod(value: number) { this._aquaeDebuffMod = Utils.clamp(value, this.modMin, this.modMax); }
    public set mortisDebuffMod(value: number) { this._mortisDebuffMod = Utils.clamp(value, this.modMin, this.modMax); }
    public set vitaeDebuffMod(value: number) { this._vitaeDebuffMod = Utils.clamp(value, this.modMin, this.modMax); }
    public set luminisDebuffMod(value: number) { this._luminisDebuffMod = Utils.clamp(value, this.modMin, this.modMax); }
    public set tenebrisDebuffMod(value: number) { this._tenebrisDebuffMod = Utils.clamp(value, this.modMin, this.modMax); }


}