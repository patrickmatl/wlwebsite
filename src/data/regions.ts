import { Location } from '@/types';

interface Region {
  name: string;
  slug: string;
  locations: Location[];
}

export const regions: Region[] = [
  {
    name: 'Gauteng',
    slug: 'gauteng',
    locations: [
      {
        id: 'pretoria',
        city: 'Pretoria',
        slug: 'pretoria',
        region: 'Gauteng',
        title: 'Creative Services in Pretoria',
        description: 'Professional creative services in Pretoria. Web design, graphic design, and digital marketing solutions.',
        subLocations: [
          {
            name: 'Centurion',
            slug: 'centurion',
            description: 'Creative services in Centurion'
          },
          {
            name: 'Menlyn',
            slug: 'menlyn',
            description: 'Creative services in Menlyn'
          }
        ]
      },
      {
        id: 'johannesburg',
        city: 'Johannesburg',
        slug: 'johannesburg',
        region: 'Gauteng',
        title: 'Creative Services in Johannesburg',
        description: 'Professional creative services in Johannesburg. Web design, graphic design, and digital marketing solutions.',
        subLocations: [
          {
            name: 'Sandton',
            slug: 'sandton',
            description: 'Creative services in Sandton'
          },
          {
            name: 'Rosebank',
            slug: 'rosebank',
            description: 'Creative services in Rosebank'
          }
        ]
      },
      {
        id: 'ekurhuleni',
        city: 'Ekurhuleni',
        slug: 'ekurhuleni',
        region: 'Gauteng',
        title: 'Creative Services in Ekurhuleni',
        description: 'Professional creative services in Ekurhuleni. Web design, graphic design, and digital marketing solutions.',
        subLocations: [
          {
            name: 'Benoni',
            slug: 'benoni',
            description: 'Creative services in Benoni'
          },
          {
            name: 'Boksburg',
            slug: 'boksburg',
            description: 'Creative services in Boksburg'
          }
        ]
      }
    ]
  },
  {
    name: 'Western Cape',
    slug: 'western-cape',
    locations: [
      {
        id: 'cape-town',
        city: 'Cape Town',
        slug: 'cape-town',
        region: 'Western Cape',
        title: 'Creative Services in Cape Town',
        description: 'Professional creative services in Cape Town. Web design, graphic design, and digital marketing solutions.',
        subLocations: [
          {
            name: 'Sea Point',
            slug: 'sea-point',
            description: 'Creative services in Sea Point'
          },
          {
            name: 'Camps Bay',
            slug: 'camps-bay',
            description: 'Creative services in Camps Bay'
          }
        ]
      }
    ]
  },
  {
    name: 'KwaZulu-Natal',
    slug: 'kwazulu-natal',
    locations: [
      {
        id: 'durban',
        city: 'Durban',
        slug: 'durban',
        region: 'KwaZulu-Natal',
        title: 'Creative Services in Durban',
        description: 'Professional creative services in Durban. Web design, graphic design, and digital marketing solutions.',
        subLocations: [
          {
            name: 'Umhlanga',
            slug: 'umhlanga',
            description: 'Creative services in Umhlanga'
          },
          {
            name: 'Ballito',
            slug: 'ballito',
            description: 'Creative services in Ballito'
          }
        ]
      }
    ]
  },
  {
    name: 'Eastern Cape',
    slug: 'eastern-cape',
    locations: [
      {
        id: 'port-elizabeth',
        city: 'Port Elizabeth',
        slug: 'port-elizabeth',
        region: 'Eastern Cape',
        title: 'Creative Services in Port Elizabeth',
        description: 'Professional creative services in Port Elizabeth. Web design, graphic design, and digital marketing solutions.',
        subLocations: []
      },
      {
        id: 'east-london',
        city: 'East London',
        slug: 'east-london',
        region: 'Eastern Cape',
        title: 'Creative Services in East London',
        description: 'Professional creative services in East London. Web design, graphic design, and digital marketing solutions.',
        subLocations: []
      }
    ]
  },
  {
    name: 'Free State',
    slug: 'free-state',
    locations: [
      {
        id: 'bloemfontein',
        city: 'Bloemfontein',
        slug: 'bloemfontein',
        region: 'Free State',
        title: 'Creative Services in Bloemfontein',
        description: 'Professional creative services in Bloemfontein. Web design, graphic design, and digital marketing solutions.',
        subLocations: []
      }
    ]
  },
  {
    name: 'Mpumalanga',
    slug: 'mpumalanga',
    locations: [
      {
        id: 'nelspruit',
        city: 'Nelspruit',
        slug: 'nelspruit',
        region: 'Mpumalanga',
        title: 'Creative Services in Nelspruit',
        description: 'Professional creative services in Nelspruit. Web design, graphic design, and digital marketing solutions.',
        subLocations: []
      }
    ]
  },
  {
    name: 'North West',
    slug: 'north-west',
    locations: [
      {
        id: 'rustenburg',
        city: 'Rustenburg',
        slug: 'rustenburg',
        region: 'North West',
        title: 'Creative Services in Rustenburg',
        description: 'Professional creative services in Rustenburg. Web design, graphic design, and digital marketing solutions.',
        subLocations: []
      }
    ]
  },
  {
    name: 'Limpopo',
    slug: 'limpopo',
    locations: [
      {
        id: 'polokwane',
        city: 'Polokwane',
        slug: 'polokwane',
        region: 'Limpopo',
        title: 'Creative Services in Polokwane',
        description: 'Professional creative services in Polokwane. Web design, graphic design, and digital marketing solutions.',
        subLocations: []
      }
    ]
  },
  {
    name: 'Northern Cape',
    slug: 'northern-cape',
    locations: [
      {
        id: 'kimberley',
        city: 'Kimberley',
        slug: 'kimberley',
        region: 'Northern Cape',
        title: 'Creative Services in Kimberley',
        description: 'Professional creative services in Kimberley. Web design, graphic design, and digital marketing solutions.',
        subLocations: []
      }
    ]
  }
];
