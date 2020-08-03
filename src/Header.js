import React from 'react'
import styled from 'styled-components'

const Title = styled.h3`
    color: white;
`

const SubText = styled.p`
    color: gray;
`

const HeaderContainer = styled.div`
    padding: 0 1em;
    margin: 20px 0;
`

export default function Header() {
    return (
        <HeaderContainer>
            <Title>{`Configure Data Fields`}</Title>
            <SubText>{`Drag & drop between columns to configure visible data.`}</SubText>
        </HeaderContainer>
    )
}
