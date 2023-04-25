<script context="module">
    // main navigation for the application
    import Home from './Home.svelte';
    import Schedule from './Schedule.svelte';
    import About from './About.svelte';
    import Coaches from './Coaches.svelte';
    import Donate from './Donate.svelte';
    
    // these are our 'pages' to navigate through (in order for this export to work the script tag MUST include context="module")
    export const navOptions = [
        { page: 'Home',   component: Home },
        { page: 'About',   component: About },
        { page: 'Lessons', component: Coaches },
        { page: 'Schedule',   component: Schedule },
        { page: 'Donate',   component: Donate },
            // other navigation pages can go here
    ];
</script>