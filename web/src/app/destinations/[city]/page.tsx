import CityDestinationClient from '@/components/CityDestinationClient';
import { citiesData, cityMeta } from '@/data/citiesData';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ city: string }>;
};

export default async function Destinations({ params }: Props) {
  const { city } = await params;
  const slug = city.toLowerCase();

  const cityData = citiesData[slug];
  const meta = cityMeta[slug];

  if (!cityData || !meta) {
    notFound();
  }

  return <CityDestinationClient cityData={cityData} meta={meta} />;
}
