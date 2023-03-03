import { Box as NativeBox } from '@react-three/drei'
import { useRef } from 'react';

function Box(props){

    //for direct access to mesh
    const mesh = useRef();

    return(
        <NativeBox
            args={[1, 1, 1]}
            {...props}
            ref={mesh}
            scale={[5, 5, 5]}
        >
            <meshStandardMaterial
                attach="material"
                color='#720b23'
            />
        </NativeBox>
    )
}

export default Box;