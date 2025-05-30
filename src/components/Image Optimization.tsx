import Image from 'next/image'
 
interface ExampleProps {
  name: string;
}
 
const ExampleComponent = (props: ExampleProps) : JSX.Element => {
  return (
    <>
      <Image
        src="example.png"
        alt="Example picture"
        width={500}
        height={500}
      />
      <span>{props.name}</span>
    </>
  )
}