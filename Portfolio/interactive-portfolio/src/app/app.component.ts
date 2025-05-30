import {
  Component,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  // Grab every section with the template‐ref #section
  @ViewChildren('section', { read: ElementRef }) sections!: QueryList<ElementRef>;
  @ViewChild('heroVideo', { static: true })
  video!: ElementRef<HTMLVideoElement>;
  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    this.sections.forEach(s => observer.observe(s.nativeElement));
    const v = this.video.nativeElement;
    // Ensure it’s muted so autoplay isn’t blocked
    v.muted = true;
    v.playsInline = true;
    v.loop = true;

    // Built-in loop attribute should work, but we’ll
    // also manually rewind+play as a failsafe:
    v.addEventListener('ended', () => {
      v.currentTime = 0;
      v.play();
    });

    // Finally, ask the browser to play
    v.play().catch(err => {
      console.warn('Autoplay prevented:', err);
      // you could show a “Click to start” overlay here
    });
  }

  onContact(evt: Event) {
    evt.preventDefault();
    alert('Thanks! I’ll be in touch soon.');
  }

  
  texts = [
    'Hello My Name Is Phil Askander',
    "Welcome To My Portfolio!",
  ];
  displayText = '';
  textIndex = 0;
  charIndex = 0;

  typingSpeed = 100; // ms per character
  pauseDelay  = 1500; // ms before erasing

  ngOnInit() {
    this.type();
  }

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
      // move to next text (loop)
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      setTimeout(() => this.type(), this.typingSpeed);
    }
  }
}
