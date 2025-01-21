import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      content: "+234 123 456 7890",
      desc: "Available Mon-Fri, 9am-6pm",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@b2exclusive.com",
      desc: "We&#39;ll respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "90, Downtown St, USA",
      desc: "Drop by for a coffee",
    },
  ];

  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-200">
            Let&#39;s Connect
          </h1>
          <p className="text-white max-w-2xl mx-auto">
            Reach out to us through any of these channels. We&#39;re here to
            help and would love to hear from you.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white rounded-lg border border-gray-100 hover:border-blue-500 transition-all"
            >
              <method.icon className="w-8 h-8 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
              <p className="text-gray-900 mb-2">{method.content}</p>
              <p className="text-sm text-gray-500">{method.desc}</p>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-8 text-gray-200">
            Connect With Us
          </h2>
          <div className="flex justify-center gap-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="group flex flex-col items-center gap-2"
              >
                <div className="p-4 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors">
                  <social.icon className="w-6 h-6 text-gray-600 group-hover:text-blue-500 transition-colors" />
                </div>
                <span className="text-sm text-white group-hover:text-blue-500 transition-colors">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
