import { ListItem, ListView, SectionHeaderComponent } from "mzfw/device/UiListView";
import { Component } from "mzfw/device/UiComponent";
import { Path } from "mzfw/device/Path";

class RootPage extends ListView<{}> {
  protected build(): (Component<any> | null)[] {
    const root = new Path("full", "/storage/js_apps/data");
    let names: string[] = [];
    let error = "";

    try {
      names = root.list() ?? [];
    } catch (e) {
      error = String(e);
    }

    const hits: { id: string; version?: string; language?: string }[] = [];

    for (const name of names) {
      const id = String(name);
      try {
        const file = new Path("full", `/storage/js_apps/data/${id}/flex_set.txt`);
        if (!file.exists()) continue;

        let version: string | undefined;
        let language: string | undefined;
        try {
          const cfg = file.fetchJSON();
          version = cfg?.lastVersion;
          language = cfg?.flowLanguageCodeZone;
        } catch {}

        hits.push({ id, version, language });
      } catch {}
    }

    const result: (Component<any> | null)[] = [
      new SectionHeaderComponent("FlowDiag Balance 3"),
      new ListItem({
        title: `Folders: ${names.length}`,
        description: error || "Scanning /storage/js_apps/data",
      }),
    ];

    if (hits.length) {
      result.push(new SectionHeaderComponent("FOUND flex_set.txt"));
      for (const hit of hits) {
        result.push(new ListItem({
          title: hit.id,
          description: `version=${hit.version ?? "?"}; language=${hit.language ?? "?"}`,
          titleColor: 0x33FF33,
        }));
      }
    } else {
      result.push(new ListItem({
        title: "No flex_set.txt found",
        description: names.slice(0, 10).join(", ") || error || "Directory empty/unreadable",
        titleColor: 0xFF9900,
      }));
    }

    return result;
  }

  protected buildMore(_page: number): Promise<Component<any>[]> {
    return Promise.resolve([]);
  }
}

Page(RootPage.makePage(new RootPage({})));
