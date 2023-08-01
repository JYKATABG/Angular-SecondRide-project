export interface Offer {
  _id: string | undefined;
  _ownerId: string;
  carImage: string;
  createdDate: Date;
  brand: string;
  model: string;
  engine: string;
  price: number;
  horsepower: number;
  mileage: number;
  location: string;
  color: string;
  phone: string;
  fuelTypes: string;
  gearboxTypes: string;
  categoryTypes: string;
  doorsTypes: string;
  descriptionArea: string;
}
