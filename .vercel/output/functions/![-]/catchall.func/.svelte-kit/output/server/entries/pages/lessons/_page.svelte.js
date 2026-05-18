import { F as fallback, k as attr_class, j as attr, D as escape_html, A as ensure_array_like, af as stringify, m as bind_props, O as head } from "../../../chunks/renderer.js";
import { H as Hero } from "../../../chunks/Hero.js";
function Bio($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let person = $$props["person"];
    let index = fallback($$props["index"], 0);
    let flip = fallback($$props["flip"], false);
    $$renderer2.push(`<article class="grid gap-8 md:grid-cols-12 py-12 md:py-16 border-b border-line"><figure${attr_class("md:col-span-5", void 0, { "md:order-2": flip })}><img${attr("src", `/${person.Picture}`)}${attr("alt", `${person.Name}, Cruces Chess Club coach`)} class="w-full aspect-[4/5] object-cover rounded-md"/></figure> <div${attr_class("md:col-span-7 flex flex-col justify-center space-y-6", void 0, { "md:order-1": flip })}><div class="space-y-3"><div class="flex items-center gap-3"><span class="block h-px w-8 bg-accent" aria-hidden="true"></span> <span class="text-xs uppercase tracking-[0.22em] text-accent font-medium">Coach ${escape_html(String(index + 1).padStart(2, "0"))}</span></div> <h2 class="font-display text-4xl md:text-5xl text-ink leading-tight tracking-tight">${escape_html(person.Name)}</h2></div> `);
    if (person.Bio) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="space-y-3 text-ink-soft leading-relaxed max-w-[60ch]"><!--[-->`);
      const each_array = ensure_array_like(person.Bio);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let paragraph = each_array[$$index];
        $$renderer2.push(`<p>${escape_html(paragraph)}</p>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <dl class="grid gap-2 text-sm max-w-md"><dt class="text-xs uppercase tracking-[0.22em] text-mute mb-1">Strengths</dt> <!--[-->`);
    const each_array_1 = ensure_array_like(person.Strengths);
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let strength = each_array_1[i];
      $$renderer2.push(`<dd class="flex items-baseline gap-4 text-ink-soft"><span class="font-mono text-mute text-xs">${escape_html(String(i + 1).padStart(2, "0"))}</span> <span>${escape_html(strength)}</span></dd>`);
    }
    $$renderer2.push(`<!--]--></dl> <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pt-4 border-t border-line text-sm"><a${attr("href", `mailto:${stringify(person.Email)}`)} class="text-ink-soft hover:text-accent transition-soft underline-offset-4 hover:underline">${escape_html(person.Email)}</a> <a${attr("href", `tel:${stringify(person.Phone.replace(/[^0-9+]/g, ""))}`)} class="text-ink-soft hover:text-accent transition-soft underline-offset-4 hover:underline">${escape_html(person.Phone)}</a></div></div></article>`);
    bind_props($$props, { person, index, flip });
  });
}
const Coaches = [{ "Name": "Ron Farrar", "Strengths": ["Fundamentals", "Stategic/positional concepts", "Endgame", "Pawn structures"], "Phone": "(303) 901-8422", "Email": "ardea83@frontier.com", "Picture": "ron_f.jpeg" }, { "Name": "Jesse Vick", "Strengths": ["Chess master", "Experienced coach", "End games"], "Bio": ["Jesse Vick is a National Chess Expert affiliated with the US Chess Federation. With an impressive 21 years of experience in the chess world, Jesse's passion for the game knows no bounds.", "Hailing from the vibrant chess community of the Dallas-Fort Worth region, Jesse's journey began as a scholastic champion. Throughout the years, he has honed his skills, becoming a beacon of excellence in the chess world.", "Jesse has generously shared his knowledge and expertise with numerous players and clubs. Notably, he has served as a coach for the renowned Arrowhead Park Early College High School (APECHS), fostering a culture of chess excellence among the students.", "Jesse is thrilled to guide and inspire local players in their pursuit of chess mastery. Whether you're a novice seeking to learn the game or an aspiring competitor looking to improve your skills, Jesse is ready to offer his expertise and support."], "Phone": "(575) 649-4561", "Email": "jess3v777@gmail.com", "Picture": "jesse_vick.png" }, { "Name": "Will Barela", "Strengths": ["Experienced coach", "Scholastic chess director", "All experience levels"], "Phone": "(575) 449-5807", "Email": "wibarela@nmsu.edu", "Picture": "will.jpg" }, { "Name": "Travis Dent", "Strengths": ["Openings", "Building a reportoire", "Fundamentals", "Middle Game"], "Phone": "(940) 597-5923", "Email": "travisdent080@gmail.com", "Picture": "travis_dent.png" }, { "Name": "Jake Jasmin", "Strengths": ["Fundamentals", "Openings"], "Phone": "(575) 323-1060", "Email": "jacob.jasmin.94@gmail.com", "Picture": "jake_bio.jpeg" }];
const Coaches$1 = {
  Coaches
};
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("1vg779e", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Lessons — Cruces Chess Club</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Meet the Cruces Chess Club coaches. Lessons across fundamentals, openings, middlegame, and endgame."/> <meta property="og:title" content="Lessons — Cruces Chess Club"/>`);
    });
    Hero($$renderer2, {
      eyebrow: "Coaching",
      title: "Meet the",
      accent: "coaches.",
      lead: "No matter where you are on your chess journey, there's a coach here who can guide you to your next milestone.",
      align: "left"
    });
    $$renderer2.push(`<!----> <section class="max-w-6xl mx-auto px-6"><!--[-->`);
    const each_array = ensure_array_like(Coaches$1.Coaches);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let Coach = each_array[i];
      Bio($$renderer2, { person: Coach, index: i, flip: i % 2 === 1 });
    }
    $$renderer2.push(`<!--]--></section>`);
  });
}
export {
  _page as default
};
