import React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';

function Icon({ id, open }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={2}
      stroke='currentColor'
      className={`${
        id === open ? 'rotate-180' : ''
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
      />
    </svg>
  );
}

export function FAQsection() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = value => setOpen(open === value ? 0 : value);

  return (
    <div className='my-20 max-w-[800px] mx-auto'>
      <h1 className='pb-10 mb-6 text-4xl font-bold text-center'>
        Frequently Asked Questions
      </h1>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          The Jungle Awaits ?
        </AccordionHeader>
        <AccordionBody>
          Nestled on the banks of the Kirindi Oya River and surrounded by wild
          jungles, bubbling mountain streams, and abundant flora and fauna. It’s
          the perfect setting for the many adventure activities provided at the
          resort or simply a place to be still and merge with nature.
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(4)}>
          The Perfect Jungle Setting ?
        </AccordionHeader>
        <AccordionBody>
          Nestled on the banks of the Kirindi Oya River and surrounded by wild
          jungles, bubbling mountain streams, and abundant flora and fauna. It’s
          the perfect setting for the many adventure activities provided at the
          resort or simply a place to be still and merge with nature.
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          Our Wild Bee Honey Community Project ?
        </AccordionHeader>
        <AccordionBody>
          Nestled on the banks of the Kirindi Oya River and surrounded by wild
          jungles, bubbling mountain streams, and abundant flora and fauna. It’s
          the perfect setting for the many adventure activities provided at the
          resort or simply a place to be still and merge with nature.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          Designated a “Bird Friendly Facilitator ?
        </AccordionHeader>
        <AccordionBody>
          Nestled on the banks of the Kirindi Oya River and surrounded by wild
          jungles, bubbling mountain streams, and abundant flora and fauna. It’s
          the perfect setting for the many adventure activities provided at the
          resort or simply a place to be still and merge with nature.
        </AccordionBody>
      </Accordion>
    </div>
  );
}
