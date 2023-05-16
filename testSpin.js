process.stdout.write('text')

setTimeout(()=>{
    process.stdout.write('\r another txt')
    process.stdout.write('\n and another still')
    
}, [2000])