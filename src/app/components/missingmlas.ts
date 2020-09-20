export class MLA {

  constructor(name, party, email) {
    this.name = name;
    this.party_name = party;
    this.email = email;
  }

  public static mlas = [new MLA('Stephanie Cadieux', 'British Columbia Liberal Party', 'stephanie.cadieux.MLA@leg.bc.ca')];
  public name: string;
  // tslint:disable-next-line:variable-name
  public party_name: string;
  public email: string;



}




