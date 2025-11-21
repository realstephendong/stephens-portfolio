// Experience Timeline Component
const ExperienceTimeline = ({ experience, index }) => {
  const {
    role, company, logo, website, location, project, dateRange, jobfocus
  } = experience;

  return (
    <div className="flex items-start gap-7">
      {/* Left: Date & Location */}
      <div className="hidden w-52 md:block">
        <p className="text-lg leading-9 font-semibold">{dateRange}</p>
        <p className="text-foreground/80 text-base font-medium">{location}</p>
      </div>

      {/* Connecting line */}
      <hr className="border-t-foreground/30 hidden md:my-4 md:block md:flex-grow max-w-[200px]" />

      {/* Company & Role */}
      <div className="flex grow flex-col gap-5 md:w-64">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2.5">
            <h3 className="text-2xl md:text-3xl font-semibold">{company}</h3>
            <p className="text-base text-muted-foreground md:text-lg font-medium">
              {role} {project && <span className="text-muted-foreground/70">· {project}</span>}
            </p>
          </div>

          {/* Logo */}
          {logo && (
            <div className="p-px rounded-lg border-2 border-border">
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  alt={company}
                  loading="lazy"
                  width="84"
                  height="84"
                  decoding="async"
                  className="w-9 h-9 rounded-md"
                  src={logo}
                />
              </a>

            </div>
          )}
        </div>

        {jobfocus && jobfocus.length > 0 && (
          <div className="inline-flex items-center rounded-full font-medium text-foreground border h-9 gap-1.5 self-start px-3">
            <span className="text-sm">{jobfocus[0]}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
