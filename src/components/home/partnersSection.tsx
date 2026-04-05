import { mockPartners } from '@/services/mockData.service'
import Image from 'next/image'

const PartnersSection = () => {
    return (
        <>
            <section className='py-12 md:py-16 bg-muted/30 w-screen relative left-1/2 right-1/2 -mx-[50vw]'>
                <div className='w-full'>
                    <div className='mx-auto max-w-7xl px-4 md:px-6 lg:px-8'>
                        <div className='mb-8 text-center'>
                            <h2 className='mb-3 text-2xl font-bold md:text-3xl'>Nuestros Aliados</h2>
                            <p className='text-muted-foreground'>Trabajamos con instituciones confiables</p>
                        </div>
                    </div>

                    <div className='relative overflow-hidden w-full'>
                        <div className='flex gap-8 md:gap-12 animate-scroll'>
                            {[...mockPartners, ...mockPartners].map((partner, index) => (
                                <div
                                    key={`${partner.name}-${index}`}
                                    className='shrink-0 grayscale transition-all hover:grayscale-0 px-2'
                                >
                                    <Image
                                        src={partner.logo || '/placeholder.svg'}
                                        alt={partner.name}
                                        width={120}
                                        height={60}
                                        className='h-12 w-auto object-contain md:h-16'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PartnersSection;
