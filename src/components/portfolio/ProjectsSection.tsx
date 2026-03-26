import type {
  AwardHighlight,
  ProjectCard,
  PublicationCard,
} from "@/lib/cv-data";
import { projects, publications, awards } from "@/lib/cv-data";
import { Cpu, Network, Trophy, Waves } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Card =
  | ({ kind: "project" } & ProjectCard)
  | ({ kind: "publication" } & PublicationCard)
  | ({ kind: "award" } & AwardHighlight);

function getIconForCard(card: Card) {
  if (card.kind === "project") {
    if (card.title.toLowerCase().includes("trading")) return Waves;
    return Network;
  }
  if (card.kind === "publication") return Cpu;
  return Trophy;
}

function getCardAccent(card: Card) {
  if (card.kind === "project") return "bg-glow/10 border-glow/20";
  if (card.kind === "publication") return "bg-glow/8 border-glow/15";
  return "bg-white/5 border-glow/25";
}

function CardListItem({ text }: { text: string }) {
  return (
    <li className="flex gap-2">
      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-glow" />
      <span className="text-foreground/85">{text}</span>
    </li>
  );
}

export function ProjectsSection() {
  const cards: Card[] = [
    ...projects.map((p) => ({ kind: "project" as const, ...p })),
    ...publications.map((p) => ({ kind: "publication" as const, ...p })),
    ...awards.map((a) => ({ kind: "award" as const, ...a })),
  ];

  function getSpan(card: Card) {
    if (card.kind === "project" && card.title === "AI Trading Bot") {
      return "md:col-span-7 lg:col-span-7";
    }
    if (card.kind === "project" && card.title === "Bluetooth Car") {
      return "md:col-span-5 lg:col-span-5";
    }
    return "md:col-span-6 lg:col-span-6";
  }

  return (
    <div className="grid gap-4 md:grid-cols-12">
      {cards.map((card) => {
        const Icon = getIconForCard(card);
        return (
          <div
            key={card.title}
            className={`relative overflow-hidden rounded-3xl border border-foreground/10 bg-white/5 p-6 backdrop-blur-xl ${getCardAccent(card)} md:col-span-12 ${getSpan(card)}`}
          >
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-glow/10 blur-2xl" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-foreground/15 bg-glow/10 shadow-glow">
                      <Icon className="h-4 w-4 text-glow" />
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {card.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-foreground/75">
                    {card.description}
                  </p>
                </div>
                <div className="text-xs font-medium text-foreground/55">
                  {card.kind === "publication" ? "Publication" : "Highlight"}
                </div>
              </div>

              <ul className="mt-5 space-y-2">
                {card.kind === "project"
                  ? card.highlights.map((h) => (
                      <CardListItem key={h} text={h} />
                    ))
                  : card.kind === "publication"
                    ? [card.description].map((t) => (
                        <CardListItem key={t} text={t} />
                      ))
                    : [card.description].map((t) => (
                        <CardListItem key={t} text={t} />
                      ))}
              </ul>

              {card.kind === "project" ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {card.tags.map((t) => (
                    <Badge key={t} variant="default">
                      {t}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="mt-6 flex flex-wrap gap-2">
                  {card.kind === "publication" ? (
                    <Badge variant="glow">{card.venue}</Badge>
                  ) : (
                    <Badge variant="glow">Discipline & Strength</Badge>
                  )}
                </div>
              )}

              {card.kind === "project" && card.title === "Bluetooth Car" ? (
                <div className="mt-5">
                  {card.youtubeUrl && card.youtubeUrl.trim().length > 0 ? (
                    <Button
                      href={card.youtubeUrl}
                      variant="outline"
                      size="sm"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch on YouTube
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" disabled>
                      Watch on YouTube
                    </Button>
                  )}
                </div>
              ) : null}

              {card.kind === "project" && card.title === "AI Trading Bot" ? (
                <div className="mt-5">
                  {card.githubUrl && card.githubUrl.trim().length > 0 ? (
                    <Button
                      href={card.githubUrl}
                      variant="outline"
                      size="sm"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View GitHub
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" disabled>
                      View GitHub
                    </Button>
                  )}
                </div>
              ) : null}

              {card.kind === "publication" && (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-glow hover:underline"
                >
                  View on {card.venue}
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

