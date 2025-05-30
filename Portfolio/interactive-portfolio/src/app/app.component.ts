import {
  Component,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
  OnInit
} from '@angular/core';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  // existing observers for sections & hero video
  @ViewChildren('section', { read: ElementRef }) sections!: QueryList<ElementRef>;
  @ViewChild('heroVideo', { static: true }) video!: ElementRef<HTMLVideoElement>;

  // NEW: grab the timeline container, each item, **and** the year label
  @ViewChild('timeline', { read: ElementRef }) timelineEl!: ElementRef;
  @ViewChildren('timelineItem', { read: ElementRef }) items!: QueryList<ElementRef>;
  @ViewChild('timelineYear', { read: ElementRef }) yearEl!: ElementRef; // ← added
 // NEW: control drawer & form fields
 contactOpen = false;
 firstName = '';
 lastName = '';
 contactEmail = '';
 contactMessage = '';

 // existing ngOnInit, ngAfterViewInit, etc.

 // toggle drawer
 toggleContact() {
   this.contactOpen = !this.contactOpen;
 }

 // on form submit
 onSubmitContact() {
  const templateParams = {
    name: this.firstName + ' ' + this.lastName,
    email: this.contactEmail,
    message: this.contactMessage
  };

  emailjs.send(
    'service_rq9xvnk',          
    'template_nejwub9',         
    templateParams,
    'EW7J7crfEh7MdNyII'     
  ).then(() => {
    alert('Thanks! Your message was sent 🎉');
    this.resetForm();
    this.toggleContact(); // close the drawer
  }).catch(error => {
    console.error('EmailJS Error:', error);
    alert('Something went wrong. Please try again later.');
  });

}

resetForm() {
  this.firstName = '';
  this.lastName = '';
  this.contactEmail = '';
  this.contactMessage = '';
}

  ngOnInit() {
    this.type();
  }

  ngAfterViewInit() {
    // 1) Section scroll‐reveal (unchanged)
    const sectionObs = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            sectionObs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.3 }
    );
    this.sections.forEach(s => sectionObs.observe(s.nativeElement));

    // 2) Hero video autoplay/fallback logic (unchanged)
    const v = this.video.nativeElement;
    v.muted = true;
    v.playsInline = true;
    v.loop = true;
    v.addEventListener('ended', () => {
      v.currentTime = 0;
      v.play();
    });
    v.play().catch(err => console.warn('Autoplay prevented:', err));

    // 3) Timeline scroll-sync observer
    const itemObs = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            this.highlightItem(e.target as HTMLElement);
          }
        }
      },
      { threshold: 0.5 }
    );
    this.items.forEach(i => itemObs.observe(i.nativeElement));
  }

  /** Called when a timeline-item crosses the 50% viewport threshold */
  highlightItem(el: HTMLElement) {
    // 1) Clear any previous “active”
    this.items.forEach(i => 
      i.nativeElement.classList.remove('active')
    );

    // 2) Mark this one active
    el.classList.add('active');

    // 3) Update the floating year label
    const year = el.getAttribute('data-year') || '';
    this.yearEl.nativeElement.textContent = year;

    // 4) Move the pointer dot
    const timelineRect = this.timelineEl.nativeElement.getBoundingClientRect();
    const itemRect     = el.getBoundingClientRect();
    const pointerEl    = this.timelineEl.nativeElement.querySelector('.timeline-pointer') as HTMLElement;
    

    // Compute y‐offset of the item’s top relative to the timeline container
    const offsetTop = itemRect.top - timelineRect.top + (itemRect.height * 0.1);

    // Animate pointer
    pointerEl.style.top = `${offsetTop}px`;
    this.yearEl.nativeElement.style.top = `${offsetTop}px`;
  }
    

  onContact(evt: Event) {
    evt.preventDefault();
    alert('Thanks! I’ll be in touch soon.');
  }

  // typing animation (unchanged)
  texts = [
    'Hello My Name Is Phil Askander',
    "Welcome To My Portfolio!",
  ];
  displayText = '';
  textIndex = 0;
  charIndex = 0;
  typingSpeed = 100;
  pauseDelay  = 1500;

  type() {
    const current = this.texts[this.textIndex];
    if (this.charIndex < current.length) {
      this.displayText += current.charAt(this.charIndex++);
      setTimeout(() => this.type(), this.typingSpeed);
    } else {
      setTimeout(() => this.erase(), this.pauseDelay);
    }
  }

  erase() {
    if (this.charIndex > 0) {
      this.displayText = this.displayText.slice(0, -1);
      this.charIndex--;
      setTimeout(() => this.erase(), this.typingSpeed / 2);
    } else {
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      setTimeout(() => this.type(), this.typingSpeed);
    }
  }

  
}
