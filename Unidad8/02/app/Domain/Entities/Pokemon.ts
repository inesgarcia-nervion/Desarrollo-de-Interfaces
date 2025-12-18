export class Pokemon {
  public _id: number;
  public _name: string;
  public _url: string;

  constructor(name: string, url: string) {
    this._name = name;
    this._url = url;
    this._id = this.extractIdFromUrl(url);
  }

  private extractIdFromUrl(url: string): number {
    // URL ejemplo: https://pokeapi.co/api/v2/pokemon/25/
    const segments = url.replace(/\/$/, '').split('/');
    const id = parseInt(segments[segments.length - 1]);
    return isNaN(id) ? 0 : id;
  }
}