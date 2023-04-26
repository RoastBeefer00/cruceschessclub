<script>
    import { writable } from 'svelte/store';
    
    const images = writable([]);
    const imageModules = import.meta.glob("../club_pics/*.jpeg");

    for (const modulePath in imageModules) {
        imageModules[modulePath]().then(({ default: imageUrl }) => {
        // console.log(modulePath, imageUrl);
        $images = [...$images, imageUrl];
        });
    }

    console.log(images);

    const next = () => {
      index = (index + 1) % $images.length
    }

</script>