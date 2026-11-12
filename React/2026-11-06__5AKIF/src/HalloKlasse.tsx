interface HalloKlasseProps {
    klassenName: string;
    stufe: string;
}
function HalloKlasse(props: HalloKlasseProps) {
    //dev mod 2 mal ausgeführt
    console.log("Hallo Klasse");
    return (
        <>
            <p>
                Hallo {props.klassenName}
                <span>({props.stufe})</span>
            </p>
        </>
    );
}

export default HalloKlasse;
