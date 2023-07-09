


export const cancel = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
}

export const block = (e: React.MouseEvent) => {
    e.stopPropagation()
}


export const handleImgError = (e: any) => e.target.style.display = 'none'
