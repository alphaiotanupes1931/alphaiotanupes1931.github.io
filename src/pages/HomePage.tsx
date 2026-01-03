import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import eventsImg from '@/assets/events-new.jpg';
import serviceImg from '@/assets/service-new.jpg';
import heroVideo from '@/assets/hero-video.mp4';

export const HomePage = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  return (
    <>
      {/* Hero Section with Parallax Video */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Video Background with Parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-110"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        {/* Content */}
        <motion.div 
          className="relative z-10 container mx-auto px-6"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-cream text-sm font-semibold tracking-[0.3em] uppercase">Kappa Alpha Psi Fraternity, Inc.</span>

              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-foreground leading-none mt-4 mb-2">
                ALPHA<br />
                <span className="text-gradient-cream">IOTA</span>
              </h1>
              
              <p className="text-cream/80 text-lg tracking-wider mb-2">
                Chartered May 29, 1931
              </p>
              
              <p className="text-xl md:text-2xl text-foreground/80 font-light mb-8">
                Morgan State University
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/about">Discover Our Chapter</Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Polemarch Welcome */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-cream text-sm font-semibold tracking-[0.2em] uppercase">Message from Leadership</span>
              
              <h2 className="font-display text-5xl md:text-6xl text-foreground mt-4 mb-6 cream-underline pb-4">
                POLEMARCH'S WELCOME
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Greetings and welcome to the official website of the Alpha Iota Chapter of Kappa Alpha Psi Fraternity, Inc. at Morgan State University.
                </p>
                <p>
                  Since our founding on May 29, 1931, we have been committed to upholding the values of achievement, training for leadership, and service to all humanity. Our brothers continue to exemplify excellence in scholarship, community service, and brotherhood.
                </p>
              </div>
              
              <div className="mt-8 pt-8 border-t border-border">
                <p className="font-display text-2xl text-cream">BROTHER MARCUS MCCLEAN</p>
                <p className="text-muted-foreground">Polemarch, Alpha Iota Chapter</p>
              </div>

              <Button variant="outline" className="mt-6" asChild>
                <Link to="/about">
                  Learn More About Us <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                <div className="relative aspect-video bg-background border-4 border-cream/20 overflow-hidden">
                  <video
                    controls
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg"
                  >
                    <source src="/placeholder-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-cream text-background p-6">
                  <p className="font-display text-4xl">2024-25</p>
                  <p className="text-sm font-semibold">POLEMARCH</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/events">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden cursor-pointer"
              >
                <img
                  src={eventsImg}
                  alt="Alpha Iota Chapter brothers at campus event"
                  className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="font-display text-3xl text-foreground">EVENTS</p>
                </div>
              </motion.div>
            </Link>

            <Link to="/community-service">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative group overflow-hidden cursor-pointer"
              >
                <img
                  src={serviceImg}
                  alt="Alpha Iota Chapter brothers volunteering at community food drive helping local families"
                  className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="font-display text-3xl text-foreground">SERVICE</p>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-crimson relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Learn more about membership opportunities and how you can become part of our legacy of excellence.
            </p>
            <Button variant="cream" size="xl" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};